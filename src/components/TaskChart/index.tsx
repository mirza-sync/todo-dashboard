import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import Card from "../ui/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

type TaskChartProps = {
  taskCount: number;
  completedCount: number;
};

const TaskChart = ({ taskCount, completedCount }: TaskChartProps) => {
  const remaining = Math.max(taskCount - completedCount, 0);

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completedCount, remaining],
        backgroundColor: ["#5285EC", "#E8ECEC"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Pie
          data={data}
          options={options}
          style={{ width: "100px", height: "100px" }}
          width="100px"
          height="100px"
        />
      </div>
    </Card>
  );
};

export default TaskChart;
