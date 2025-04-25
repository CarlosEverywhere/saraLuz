
import React from "react";
import { motion } from "framer-motion";
import { Plus, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const Usuarios = () => {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = React.useState([]);
  const [nuevoUsuario, setNuevoUsuario] = React.useState({
    nombre: "",
    contraseña: "",
    claveEmpleado: "",
    permisos: false,
  });
  const [busqueda, setBusqueda] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const cargarUsuarios = async () => {
    try {
      const { data, error } = await supabase
        .from('Usuario')
        .select('*')
        .order('IdUsuario', { ascending: true });

      if (error) throw error;
      setUsuarios(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('Usuario')
        .insert([{
          Nombre: nuevoUsuario.nombre,
          Contraseña: nuevoUsuario.contraseña,
          ClaveEmpleado: nuevoUsuario.claveEmpleado,
          Permisos: nuevoUsuario.permisos,
        }])
        .select();

      if (error) throw error;

      setUsuarios([...usuarios, data[0]]);
      setNuevoUsuario({
        nombre: "",
        contraseña: "",
        claveEmpleado: "",
        permisos: false,
      });
      toast({
        title: "Éxito",
        description: "Usuario registrado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar el usuario",
        variant: "destructive",
      });
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.Nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Usuarios</h2>
        <p className="text-muted-foreground">Gestiona los usuarios del sistema</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-card rounded-lg border shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Registrar Usuario</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoUsuario.nombre}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña*</label>
              <input
                type="password"
                className="w-full p-2 rounded-md border"
                value={nuevoUsuario.contraseña}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Clave de Empleado</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoUsuario.claveEmpleado}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, claveEmpleado: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="permisos"
                checked={nuevoUsuario.permisos}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, permisos: e.target.checked })
                }
              />
              <label htmlFor="permisos" className="text-sm font-medium">
                Otorgar permisos de acceso
              </label>
            </div>
            <Button type="submit" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" /> Registrar Usuario
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="w-full pl-10 p-2 rounded-md border"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Lista de Usuarios</h3>
            </div>
            <div className="divide-y">
              {loading ? (
                <p className="p-4 text-center">Cargando usuarios...</p>
              ) : usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((usuario) => (
                  <div key={usuario.IdUsuario} className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{usuario.Nombre}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          usuario.Permisos
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {usuario.Permisos ? "Con acceso" : "Sin acceso"}
                        </span>
                      </div>
                      {usuario.ClaveEmpleado && (
                        <p className="text-sm text-muted-foreground">
                          Clave: {usuario.ClaveEmpleado}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-center text-muted-foreground">
                  No hay usuarios para mostrar
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Usuarios;
