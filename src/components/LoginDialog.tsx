import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { loginSuccess, logout } from "@/state/auth-slice";
import { useServices } from "@/hooks/use-services";
import { Paths } from "@/utilities/Paths";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LogIn } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function LoginDialog() {
    const { customerService } = useServices();
    const [ formState, setFormState ] = useState<"login" | "register">("login");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ open, setOpen ] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerMutation = useMutation({
        mutationFn: async () => {
            await customerService.register(email, password);
            await customerService.login(email, password);
            const response = await customerService.getCustomerDetails();
            return response.email;
        },
        onSuccess: (email) => {
            dispatch(loginSuccess(email));
            navigate(Paths.featured());
            setOpen(false); // Close modal on success
        },
        onError: () => {
            dispatch(logout());
            setError("Failed to register user");
        }
    });

    const loginMutation = useMutation({
        mutationFn: async () => {
            await customerService.login(email, password);
            const response = await customerService.getCustomerDetails();
            return response.email;
        },
        onSuccess: (email) => {
            dispatch(loginSuccess(email));
            navigate(Paths.featured());
            setOpen(false);
        },
        onError: () => {
            dispatch(logout());
            setError("Invalid username or password");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formState === "login") {
            loginMutation.mutate();
        } else {
            registerMutation.mutate();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{formState === "login" ? "Log In" : "Register"}</DialogTitle>
                    <DialogDescription>
                        {formState === "login"
                            ? "Enter your credentials to access your account."
                            : "Create a new account to start shopping."}
                    </DialogDescription>
                </DialogHeader>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {formState === "login" ? "Log in" : "Register"}
                    </Button>
                    <Separator className="my-4" />
                    <Button type="button" className="w-full" onClick={() => setFormState(formState === "login" ? "register" : "login")}>
                        {formState === "login" ? "Create an account" : "Back to Login"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
