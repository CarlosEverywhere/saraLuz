
import React from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Inventario = () => {
  const { toast } = useToast();
  const [rollos, setRollos] = React.useState(() => {
    const savedRollos = localStorage.getItem("rollos");
    return savedRollos ? JSON.parse(savedRollos) : [];
  });
  const [nuevoRollo, setNuevoRollo] = React.useState({
    codigo: "",
    tipo: "",
    metros: "",
    peso: "",
    proveedor: "",
    color: "",
    ancho: "",
  });
  const [busqueda, setBusqueda] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("rollos", JSON.stringify(rollos));
  }, [rollos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoRollo.codigo || !nuevoRollo.tipo || !nuevoRollo.metros) {
      toast({
        title: "Error",
        description: "Por favor completa los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setRollos([...rollos, { ...nuevoRollo, id: Date.now() }]);
    setNuevoRollo({
      codigo: "",
      tipo: "",
      metros: "",
      peso: "",
      proveedor: "",
      color: "",
      ancho: "",
    });
    toast({
      title: "Éxito",
      description: "Rollo agregado correctamente",
    });
  };

  const rollosFiltrados = rollos.filter((rollo) =>
    rollo.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    rollo.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Inventario de Rollos</h2>
        <p className="text-muted-foreground">Gestiona tu inventario de telas</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-card rounded-lg border shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Agregar Rollo</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Código del Rollo*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoRollo.codigo}
                onChange={(e) =>
                  setNuevoRollo({ ...nuevoRollo, codigo: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Tela*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoRollo.tipo}
                onChange={(e) =>
                  setNuevoRollo({ ...nuevoRollo, tipo: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Metros*</label>
              <input
                type="number"
                className="w-full p-2 rounded-md border"
                value={nuevoRollo.metros}
                onChange={(e) =>
                  setNuevoRollo({ ...nuevoRollo, metros: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Peso (kg)</label>
              <input
                type="number"
                step="0.01"
                className="w-full p-2 rounded-md border"
                value={nuevoRollo.peso}
                onChange={(e) =>
                  setNuevoRollo({ ...nuevoRollo, peso: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Proveedor</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoRollo.proveedor}
                onChange={(e) =>
                  setNuevoRollo({ ...nuevoRollo, proveedor: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoRollo.color}
                onChange={(e) =>
                  setNuevoRollo({ ...nuevoRollo, color: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ancho (cm)</label>
              <input
                type="number"
                className="w-full p-2 rounded-md border"
                value={nuevoRollo.ancho}
                onChange={(e) =>
                  setNuevoRollo({ ...nuevoRollo, ancho: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Agregar Rollo
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
              placeholder="Buscar rollos..."
              className="w-full pl-10 p-2 rounded-md border"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Lista de Rollos</h3>
            </div>
            <div className="divide-y">
              {rollosFiltrados.map((rollo) => (
                <div key={rollo.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{rollo.codigo}</h4>
                      <p className="text-sm text-muted-foreground">
                        {rollo.tipo} - {rollo.color}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Proveedor: {rollo.proveedor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{rollo.metros}m</p>
                      <p className="text-sm text-muted-foreground">
                        {rollo.peso}kg | {rollo.ancho}cm
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {rollosFiltrados.length === 0 && (
                <p className="p-4 text-center text-muted-foreground">
                  No hay rollos para mostrar
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Inventario;
