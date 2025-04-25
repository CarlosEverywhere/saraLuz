
import React from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Prendas = () => {
  const { toast } = useToast();
  const [prendas, setPrendas] = React.useState(() => {
    const savedPrendas = localStorage.getItem("prendas");
    return savedPrendas ? JSON.parse(savedPrendas) : [];
  });
  const [nuevaPrenda, setNuevaPrenda] = React.useState({
    identificador: "",
    genero: "",
    talla: "",
    gamma: "",
  });
  const [busqueda, setBusqueda] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("prendas", JSON.stringify(prendas));
  }, [prendas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevaPrenda.identificador || !nuevaPrenda.genero || !nuevaPrenda.talla || !nuevaPrenda.gamma) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setPrendas([...prendas, { ...nuevaPrenda, id: Date.now() }]);
    setNuevaPrenda({
      identificador: "",
      genero: "",
      talla: "",
      gamma: "",
    });
    toast({
      title: "Éxito",
      description: "Prenda registrada correctamente",
    });
  };

  const prendasFiltradas = prendas.filter((prenda) =>
    prenda.identificador.toLowerCase().includes(busqueda.toLowerCase()) ||
    prenda.genero.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Prendas</h2>
        <p className="text-muted-foreground">Gestiona el catálogo de prendas</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-card rounded-lg border shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Registrar Prenda</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Identificador*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevaPrenda.identificador}
                onChange={(e) =>
                  setNuevaPrenda({ ...nuevaPrenda, identificador: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Género*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevaPrenda.genero}
                onChange={(e) =>
                  setNuevaPrenda({ ...nuevaPrenda, genero: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Talla*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevaPrenda.talla}
                onChange={(e) =>
                  setNuevaPrenda({ ...nuevaPrenda, talla: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gamma*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevaPrenda.gamma}
                onChange={(e) =>
                  setNuevaPrenda({ ...nuevaPrenda, gamma: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Registrar Prenda
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
              placeholder="Buscar prendas..."
              className="w-full pl-10 p-2 rounded-md border"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Lista de Prendas</h3>
            </div>
            <div className="divide-y">
              {prendasFiltradas.map((prenda) => (
                <div key={prenda.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{prenda.identificador}</h4>
                      <p className="text-sm text-muted-foreground">
                        {prenda.genero}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Talla: {prenda.talla}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Gamma: {prenda.gamma}
                    </p>
                  </div>
                </div>
              ))}
              {prendasFiltradas.length === 0 && (
                <p className="p-4 text-center text-muted-foreground">
                  No hay prendas para mostrar
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Prendas;
