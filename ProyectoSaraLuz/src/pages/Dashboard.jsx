
import React from "react";
import { motion } from "framer-motion";
import { Package2, Scissors, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const [stats, setStats] = React.useState({
    totalRollos: 0,
    totalTendidos: 0,
    totalProveedores: 0,
  });
  const [rollosPopulares, setRollosPopulares] = React.useState([]);
  const [tendidosRecientes, setTendidosRecientes] = React.useState([]);
  const [nombreUsuario, setNombreUsuario] = React.useState("");

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setNombreUsuario(user.Nombre);
    }

    const cargarEstadisticas = async () => {
      try {
        // Contar rollos
        const { count: rollosCount } = await supabase
          .from('InfoCRollo')
          .select('*', { count: 'exact' });

        // Contar tendidos
        const { count: tendidosCount } = await supabase
          .from('Tendido')
          .select('*', { count: 'exact' });

        // Contar proveedores
        const { count: proveedoresCount } = await supabase
          .from('Provedores')
          .select('*', { count: 'exact' });

        setStats({
          totalRollos: rollosCount || 0,
          totalTendidos: tendidosCount || 0,
          totalProveedores: proveedoresCount || 0,
        });

        // Cargar rollos populares
        const { data: rollos } = await supabase
          .from('InfoCRollo')
          .select('*')
          .limit(3);

        if (rollos) {
          setRollosPopulares(rollos);
        }

        // Cargar tendidos recientes
        const { data: tendidos } = await supabase
          .from('Tendido')
          .select('*')
          .order('FechaHoraTendido', { ascending: false })
          .limit(3);

        if (tendidos) {
          setTendidosRecientes(tendidos);
        }
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      }
    };

    cargarEstadisticas();
  }, []);

  const statsData = [
    {
      title: "Total Rollos",
      value: stats.totalRollos.toString(),
      icon: Package2,
      color: "bg-blue-500",
    },
    {
      title: "Tendidos Totales",
      value: stats.totalTendidos.toString(),
      icon: Scissors,
      color: "bg-green-500",
    },
    {
      title: "Proveedores",
      value: stats.totalProveedores.toString(),
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Inicio</h2>
        <p className="text-muted-foreground">Bienvenido, {nombreUsuario}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-card rounded-lg border shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Rollos Registrados</h3>
          <div className="space-y-4">
            {rollosPopulares.map((rollo) => (
              <div key={rollo.IdRollo} className="flex items-center justify-between">
                <span>Rollo #{rollo.IdRollo}</span>
                <span className="text-muted-foreground">{rollo.Metros}m</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Tendidos Recientes</h3>
          <div className="space-y-4">
            {tendidosRecientes.map((tendido) => (
              <div key={tendido.IdTendido} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>
                  Tendido #{tendido.IdTendido} - {tendido.TotalLienzos} lienzos
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
