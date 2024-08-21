import { Loader} from "@/shared/ui";
import {TaskList, TaskStatusTabs} from "@/widgets";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-20 p-24">

        <TaskStatusTabs/>
        <TaskList/>
        <Loader/>

    </main>
  );
}
