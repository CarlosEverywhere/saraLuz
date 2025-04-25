
import React from "react";
import { motion } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Tendidos = () => {
  const { toast } = useToast();
  const [tendidos, setTendidos] = React.useState(() => {
    const savedTendidos = localStorage.getItem("tendidos");
    return savedTendidos ? JSON.parse(savedTendidos) : [];
  });
  const [nuevoTendido, setNuevoTendido] = React.useState({
    codigo: "",
    rollos: [],
    cantidadLienzos: "",
    observaciones: "",
  });
  const [rolloActual, setRolloActual] = React.useState({
    codigo: "",
    metros: "",
  });
  const [busqueda, setBusqueda] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("tendidos", JSON.stringify(tendidos));
  }, [tendidos]);

  const agregarRollo = () => {
    if (!rolloActual.codigo || !rolloActual.metros) {
      toast({
        title: "Error",
        description: "Por favor completa los datos del rollo",
        variant: "destructive",
      });
      return;
    }
    setNuevoTendido({
      ...nuevoTendido,
      rollos: [...nuevoTendido.rollos, rolloActual],
    });
    setRolloActual({ codigo: "", metros: "" });
  };

  const eliminarRollo = (index) => {
    setNuevoTendido({
      ...nuevoTendido,
      rollos: nuevoTendido.rollos.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoTendido.codigo || nuevoTendido.rollos.length === 0 || !nuevoTendido.cantidadLienzos) {
      toast({
        title: "Error",
        description: "Por favor completa los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setTendidos([...tendidos, { ...nuevoTendido, id: Date.now(), fecha: new Date().toISOString() }]);
    setNuevoTendido({
      codigo: "",
      rollos: [],
      cantidadLienzos: "",
      observaciones: "",
    });
    toast({
      title: "Éxito",
      description: "Tendido registrado correctamente",
    });
  };

  const tendidosFiltrados = tendidos.filter((tendido) =>
    tendido.codigo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Tendidos</h2>
        <p className="text-muted-foreground">Gestiona los tendidos y lienzos</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-card rounded-lg border shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Registrar Tendido</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Código del Tendido*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoTendido.codigo}
                onChange={(e) =>
                  setNuevoTendido({ ...nuevoTendido, codigo: e.target.value })
                }
              />
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-2">Agregar Rollos</h4>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Código del Rollo"
                    className="p-2 rounded-md border"
                    value={rolloActual.codigo}
                    onChange={(e) =>
                      setRolloActual({ ...rolloActual, codigo: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Metros"
                    className="p-2 rounded-md border"
                    value={rolloActual.metros}
                    onChange={(e) =>
                      setRolloActual({ ...rolloActual, metros: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="button"
                  onClick={agregarRollo}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" /> Agregar Rollo
                </Button>
              </div>

              {nuevoTendido.rollos.length > 0 && (
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Rollos Agregados</h4>
                  <div className="space-y-2">
                    {nuevoTendido.rollos.map((rollo, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <span>
                          {rollo.codigo} - {rollo.metros}m
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarRollo(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cantidad de Lienzos*</label>
              <input
                type="number"
                className="w-full p-2 rounded-md border"
                value={nuevoTendido.cantidadLienzos}
                onChange={(e) =>
                  setNuevoTendido({ ...nuevoTendido, cantidadLienzos: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Observaciones</label>
              <textarea
                className="w-full p-2 rounded-md border"
                rows="3"
                value={nuevoTendido.observaciones}
                onChange={(e) =>
                  setNuevoTendido({ ...nuevoTendido, observaciones: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Registrar Tendido
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
              placeholder="Buscar tendidos..."
              className="w-full pl-10 p-2 rounded-md border"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Lista de Tendidos</h3>
            </div>
            <div className="divide-y">
              {tendidosFiltrados.map((tendido) => (
                <div key={tendido.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{tendido.codigo}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(tendido.fecha).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      {tendido.rollos.map((rollo, index) => (
                        <p key={index} className="text-sm">
                          Rollo {index + 1}: {rollo.codigo} - {rollo.metros}m
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Lienzos: {tendido.cantidadLienzos}
                    </p>
                    {tendido.observaciones && (
                      <p className="text-sm text-muted-foreground">
                        Observaciones: {tendido.observaciones}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {tendidosFiltrados.length === 0 && (
                <p className="p-4 text-center text-muted-foreground">
                  No hay tendidos para mostrar
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tendidos;
