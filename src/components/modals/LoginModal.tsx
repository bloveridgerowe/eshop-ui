import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/utilities/paths";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LogIn, UserPlus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { errorMessage } from "@/utilities/errors";
import { useLogin, useRegister, useDemoLogin } from "@/api/hooks/customer-hooks";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginRegisterSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Password must include at least one symbol"),
});

type LoginRegisterFormValues = z.infer<typeof loginRegisterSchema>;

type FormState = "login" | "register";

export function LoginModal() {
    const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
    const { mutateAsync: demoLogin, isPending: isDemoLoggingIn } = useDemoLogin();
    const { mutateAsync: register, isPending: isRegistering } = useRegister();
    const [ formState, setFormState ] = useState<FormState>("login");
    const [ error, setError ] = useState("");
    const [ open, setOpen ] = useState(false);

    const navigate = useNavigate();

    const { register: rhfRegister, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRegisterFormValues>({
        resolver: zodResolver(loginRegisterSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginRegisterFormValues) => {
        setError("");

        try {
            if (formState === "login") {
                await login({ email: data.email, password: data.password });
            } else {
                await register({ email: data.email, password: data.password });
            }

            navigate(Paths.products());
            setOpen(false);
        } catch (err) {
            if (formState === "login") {
                setError(errorMessage("Invalid email or password. Please try again.", err));
            }
            else {
                setError(errorMessage("Unable to register user. Please try again later.", err));
            }
        }
    };

    const handleFormStateChange = (formState: FormState) => {
        setError("");
        setFormState(formState)
    }

    const handleDemoLogin = async () => {
        setError("");

        try {
            await demoLogin();
            navigate(Paths.products());
            setOpen(false);
        } catch (err) {
            setError(errorMessage("An unexpected error occurred. Please try again later.", err));
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl gap-1.5 font-bold flex items-center text-left">
                        {formState === "login" ? (
                            <LogIn strokeWidth="2.4" className="h-[1.7rem] w-[1.7rem]" />
                        ) : (
                            <UserPlus strokeWidth="2.4" className="h-[1.7rem] w-[1.7rem]" />
                        )}
                        {formState === "login" ? "Login" : "Register"}
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        {formState === "login"
                            ? "Enter your credentials to access your account."
                            : "Create a new account to start shopping."}
                    </DialogDescription>
                </DialogHeader>
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Enter your email" {...rhfRegister("email")} required/>
                        {errors.email && (<p className="text-sm text-red-500">{errors.email.message}</p>)}
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" {...rhfRegister("password")} required/>
                        {errors.password && (<p className="text-sm text-red-500">{errors.password.message}</p>)}
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoggingIn || isDemoLoggingIn || isRegistering || isSubmitting}>
                        {formState === "login"
                            ? isLoggingIn
                                ? "Logging in..."
                                : "Login"
                            : isRegistering
                                ? "Registering..."
                                : "Register"}
                    </Button>
                    <Separator className="my-4" />
                    <div className="flex flex-col gap-4">
                        <Button
                            type="button"
                            className="w-full"
                            disabled={isLoggingIn || isDemoLoggingIn || isRegistering || isSubmitting}
                            onClick={() => handleFormStateChange(formState === "login" ? "register" : "login")}
                        >
                            {formState === "login" ? "Create An Account" : "Back To Login"}
                        </Button>
                        <Button
                            variant="constructive"
                            type="button"
                            className="w-full"
                            disabled={isLoggingIn || isDemoLoggingIn || isRegistering || isSubmitting}
                            onClick={handleDemoLogin}
                        >
                            {isDemoLoggingIn ? "Logging in..." : "Login To Demo Account"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
