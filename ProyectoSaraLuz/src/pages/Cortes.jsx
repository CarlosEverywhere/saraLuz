
import React from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Cortes = () => {
  const { toast } = useToast();
  const [cortes, setCortes] = React.useState(() => {
    const savedCortes = localStorage.getItem("cortes");
    return savedCortes ? JSON.parse(savedCortes) : [];
  });
  const [nuevoCorte, setNuevoCorte] = React.useState({
    codigo: "",
    tendido: "",
    tipoPrenda: "",
    cantidadLienzos: "",
    cantidadBultos: "",
    maquilero: "",
    fechaEntrega: "",
    horaEntrega: "",
    fechaSalida: "",
    horaSalida: "",
    observaciones: "",
  });
  const [busqueda, setBusqueda] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("cortes", JSON.stringify(cortes));
  }, [cortes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoCorte.codigo || !nuevoCorte.tendido || !nuevoCorte.tipoPrenda) {
      toast({
        title: "Error",
        description: "Por favor completa los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setCortes([...cortes, { ...nuevoCorte, id: Date.now(), fecha: new Date().toISOString() }]);
    setNuevoCorte({
      codigo: "",
      tendido: "",
      tipoPrenda: "",
      cantidadLienzos: "",
      cantidadBultos: "",
      maquilero: "",
      fechaEntrega: "",
      horaEntrega: "",
      fechaSalida: "",
      horaSalida: "",
      observaciones: "",
    });
    toast({
      title: "Éxito",
      description: "Corte registrado correctamente",
    });
  };

  const cortesFiltrados = cortes.filter((corte) =>
    corte.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    corte.tipoPrenda.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Cortes</h2>
        <p className="text-muted-foreground">Gestiona los cortes y producción</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-card rounded-lg border shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Registrar Corte</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Código del Corte*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoCorte.codigo}
                onChange={(e) =>
                  setNuevoCorte({ ...nuevoCorte, codigo: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tendido*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoCorte.tendido}
                onChange={(e) =>
                  setNuevoCorte({ ...nuevoCorte, tendido: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Prenda*</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoCorte.tipoPrenda}
                onChange={(e) =>
                  setNuevoCorte({ ...nuevoCorte, tipoPrenda: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cantidad de Lienzos</label>
              <input
                type="number"
                className="w-full p-2 rounded-md border"
                value={nuevoCorte.cantidadLienzos}
                onChange={(e) =>
                  setNuevoCorte({ ...nuevoCorte, cantidadLienzos: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cantidad de Bultos</label>
              <input
                type="number"
                className="w-full p-2 rounded-md border"
                value={nuevoCorte.cantidadBultos}
                onChange={(e) =>
                  setNuevoCorte({ ...nuevoCorte, cantidadBultos: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Maquilero</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border"
                value={nuevoCorte.maquilero}
                onChange={(e) =>
                  setNuevoCorte({ ...nuevoCorte, maquilero: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de Entrega</label>
                <input
                  type="date"
                  className="w-full p-2 rounded-md border"
                  value={nuevoCorte.fechaEntrega}
                  onChange={(e) =>
                    setNuevoCorte({ ...nuevoCorte, fechaEntrega: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hora de Entrega</label>
                <input
                  type="time"
                  className="w-full p-2 rounded-md border"
                  value={nuevoCorte.horaEntrega}
                  onChange={(e) =>
                    setNuevoCorte({ ...nuevoCorte, horaEntrega: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de Salida</label>
                <input
                  type="date"
                  className="w-full p-2 rounded-md border"
                  value={nuevoCorte.fechaSalida}
                  onChange={(e) =>
                    setNuevoCorte({ ...nuevoCorte, fechaSalida: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hora de Salida</label>
                <input
                  type="time"
                  className="w-full p-2 rounded-md border"
                  value={nuevoCorte.horaSalida}
                  onChange={(e) =>
                    setNuevoCorte({ ...nuevoCorte, horaSalida: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Observaciones</label>
              <textarea
                className="w-full p-2 rounded-md border"
                rows="3"
                value={nuevoCorte.observaciones}
                onChange={(e) =>
                  setNuevoCorte({ ...nuevoCorte, observaciones: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Registrar Corte
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
              placeholder="Buscar cortes..."
              className="w-full pl-10 p-2 rounded-md border"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Lista de Cortes</h3>
            </div>
            <div className="divide-y">
              {cortesFiltrados.map((corte) => (
                <div key={corte.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{corte.codigo}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(corte.fecha).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm">Prenda: {corte.tipoPrenda}</p>
                    <p className="text-sm text-muted-foreground">
                      Tendido: {corte.tendido}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lienzos: {corte.cantidadLienzos} | Bultos: {corte.cantidadBultos}
                    </p>
                    {corte.maquilero && (
                      <p className="text-sm text-muted-foreground">
                        Maquilero: {corte.maquilero}
                      </p>
                    )}
                    <div className="text-sm text-muted-foreground">
                      <p>Entrega: {corte.fechaEntrega} {corte.horaEntrega}</p>
                      <p>Salida: {corte.fechaSalida} {corte.horaSalida}</p>
                    </div>
                    {corte.observaciones && (
                      <p className="text-sm text-muted-foreground">
                        Observaciones: {corte.observaciones}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {cortesFiltrados.length === 0 && (
                <p className="p-4 text-center text-muted-foreground">
                  No hay cortes para mostrar
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cortes;
