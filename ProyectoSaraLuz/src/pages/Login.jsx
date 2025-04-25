
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    nombre: "",
    contraseña: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Intentando iniciar sesión con:', formData);
      const { data, error } = await supabase
        .from('Usuario')
        .select('*')
        .eq('Nombre', formData.nombre)
        .eq('Contraseña', formData.contraseña)
        .single();

      console.log('Respuesta de Supabase:', { data, error });

      if (error) {
        console.error('Error de consulta:', error);
        toast({
          title: "Error",
          description: "Usuario o contraseña incorrectos",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        if (data.Permisos) {
          localStorage.setItem('user', JSON.stringify(data));
          toast({
            title: "Inicio de sesión exitoso",
            description: `Bienvenido ${data.Nombre} a Sara Luz`,
          });
          navigate('/');
        } else {
          toast({
            title: "Acceso denegado",
            description: "No tienes permisos para acceder al sistema",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Usuario o contraseña incorrectos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al iniciar sesión",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white rounded-lg border shadow-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-600">Sara Luz</h1>
          <p className="text-gray-600">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Usuario</label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full p-2 rounded-md border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              value={formData.contraseña}
              onChange={(e) =>
                setFormData({ ...formData, contraseña: e.target.value })
              }
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
