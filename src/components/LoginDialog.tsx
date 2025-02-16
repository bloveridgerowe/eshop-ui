import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/utilities/paths"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LogIn, UserPlus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { errorMessage } from "@/utilities/errors";
import { useLogin, useRegister } from "@/api/hooks/customer-hooks";

export function LoginDialog() {
    const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
    const { mutateAsync: register, isPending: isRegistering } = useRegister();
    const [ formState, setFormState ] = useState<"login" | "register">("login");
    const [ email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            if (formState === "login") {
                await login({ email, password });
            }
            else {
                await register({ email, password });
            }

            navigate(Paths.featured());
            setOpen(false);
        } catch (error) {
            setError(errorMessage("An unexpected error occurred.", error));
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
                    <DialogTitle className="text-2xl gap-1.5 font-bold flex items-center text-left">
                        {formState === "login" ? <LogIn strokeWidth="2.4" className="h-[1.7rem] w-[1.7rem]" /> : <UserPlus strokeWidth="2.4" className="h-[1.7rem] w-[1.7rem]" />}
                        {formState === "login" ? "Login" : "Register"}
                    </DialogTitle>
                    <DialogDescription className="text-left">
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
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required/>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required/>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoggingIn || isRegistering}>
                        {formState === "login"
                            ? isLoggingIn ? "Logging in..." : "Login"
                            : isRegistering ? "Registering..." : "Register"}
                    </Button>
                    <Separator className="my-4" />
                    <Button type="button" className="w-full" disabled={isLoggingIn || isRegistering} onClick={() => setFormState(formState === "login" ? "register" : "login")}>
                        {formState === "login" ? "Create An Account" : "Back To Login"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
