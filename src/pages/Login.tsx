import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Truck, Package, PackageOpen, ArrowRight, UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    // Simular login exitoso
    localStorage.setItem("isAuthenticated", "true");
    toast({
      title: "¡Bienvenido!",
      description: "Has iniciado sesión correctamente",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f5f5f7] p-12 flex-col">
        <div className="flex items-center gap-3 mb-auto">
          <div className="w-10 h-10 bg-[#2c5aa0] rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">
            Sistema de Gestión de Envíos
          </span>
        </div>

        <div className="flex items-center justify-center flex-1">
          <div className="bg-white rounded-3xl shadow-lg p-12 max-w-sm w-full">
            <div className="flex items-center justify-center mb-6">
              <div className="w-32 h-32 bg-[#e8eef7] rounded-full flex items-center justify-center">
                <div className="relative">
                  <Package className="w-16 h-16 text-[#2c5aa0]" />
                  <PackageOpen className="w-8 h-8 text-[#2c5aa0] absolute -bottom-2 -right-2" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Gestiona tus envíos
            </h2>
            <p className="text-center text-gray-600 text-sm leading-relaxed">
              Sistema integral para administrar y rastrear todos tus envíos en tiempo real
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Iniciar sesión</h1>
            <p className="text-gray-600">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white border-gray-300"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-700 cursor-pointer select-none"
                >
                  Recordarme
                </label>
              </div>
              <Button 
                variant="link" 
                type="button" 
                className="px-0 text-[#2c5aa0] hover:text-[#234a82] text-sm"
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-[#2c5aa0] hover:bg-[#234a82] text-white font-medium"
            >
              Iniciar sesión
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">¿No tienes una cuenta?</p>
            <Button
              variant="outline"
              className="w-full h-12 border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0]/5"
              onClick={() => navigate("/register")}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Crear cuenta
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm">
            <a href="#" className="text-[#2c5aa0] hover:underline">
              Términos de servicio
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-[#2c5aa0] hover:underline">
              Política de privacidad
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-[#2c5aa0] hover:underline">
              Ayuda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
