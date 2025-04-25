
import React from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Proveedores = () => {
  const { toast } = useToast();
  const [proveedores, setProveedores] = React.useState(() => {
    const savedProveedores = localStorage.getItem("proveedores");
    return savedProveedores ? JSON.parse(savedProveedores) : [];
  });
  const [nuevoProveedor, setNuevoProveedor] = React.useState({
    nombre: "",
    contacto: "",
    telefono: "",
    email: "",
    direccion: "",
    tiposTela: "",
  });
  const [busqueda, setBusqueda] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("proveedores", JSON.stringify(proveedores));
  }, [proveedores]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoProveedor.nombre || !nuevoProveedor.telefono) {
      toast({
        title: "Error",
        description: "Por favor completa los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setProveedores([...proveedores, { ...nuevoProveedor, id: Date.now() }]);
    setNuevoProveedor({
      nombre: "",
      contacto: "",
      telefono: "",
      email: "",
      direccion: "",
      tiposTela: "",
    });
    toast({
      title: "Éxito",
      description: "Proveedor agregado correctamente",
    });
  };

  const proveedoresFiltrados = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Proveedores</h2>
        <p className="text-muted-foreground">Gestiona tus proveedores de tela</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-card rounded-lg border shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Agregar Proveedor</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoProveedor.nombre}
                onChange={(e) =>
                  setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contacto</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoProveedor.contacto}
                onChange={(e) =>
                  setNuevoProveedor({ ...nuevoProveedor, contacto: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono*</label>
              <input
                type="tel"
                className="w-full p-2 rounded-md border"
                value={nuevoProveedor.telefono}
                onChange={(e) =>
                  setNuevoProveedor({ ...nuevoProveedor, telefono: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded-md border"
                value={nuevoProveedor.email}
                onChange={(e) =>
                  setNuevoProveedor({ ...nuevoProveedor, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dirección</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoProveedor.direccion}
                onChange={(e) =>
                  setNuevoProveedor({ ...nuevoProveedor, direccion: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipos de Tela</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoProveedor.tiposTela}
                onChange={(e) =>
                  setNuevoProveedor({ ...nuevoProveedor, tiposTela: e.target.value })
                }
                placeholder="Ej: Algodón, Poliéster, Mezclilla"
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Agregar Proveedor
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
              placeholder="Buscar proveedores..."
              className="w-full pl-10 p-2 rounded-md border"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Lista de Proveedores</h3>
            </div>
            <div className="divide-y">
              {proveedoresFiltrados.map((proveedor) => (
                <div key={proveedor.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{proveedor.nombre}</h4>
                      <p className="text-sm text-muted-foreground">
                        {proveedor.telefono}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Contacto: {proveedor.contacto}
                    </p>
                    {proveedor.email && (
                      <p className="text-sm text-muted-foreground">
                        Email: {proveedor.email}
                      </p>
                    )}
                    {proveedor.tiposTela && (
                      <p className="text-sm text-muted-foreground">
                        Telas: {proveedor.tiposTela}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {proveedoresFiltrados.length === 0 && (
                <p className="p-4 text-center text-muted-foreground">
                  No hay proveedores para mostrar
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Proveedores;
