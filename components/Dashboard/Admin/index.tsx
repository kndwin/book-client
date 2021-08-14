import { Tabs } from "@geist-ui/react";
import Tasks from "components/Tasks";
import { RiTaskLine } from "react-icons/ri";

export default function AdminDashboard() {
  return (
    <Tabs initialValue="1">
      <Tabs.Item
        label={
          <>
            <RiTaskLine />
            Tasks
          </>
        }
        value="1"
      >
        <Tasks />
      </Tabs.Item>
    </Tabs>
  );
}
