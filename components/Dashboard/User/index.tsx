import { Tabs } from "@geist-ui/react";
import { FiBook } from "react-icons/fi";
import FindBooks from "./FindBooks";
import OwnedBooks from "./OwnedBooks";

export default function UserDashboard() {
  return (
    <Tabs initialValue="1">
      <Tabs.Item
        label={
          <div>
            <FiBook />
            Owned Books
          </div>
        }
        value="1"
      >
        <OwnedBooks />
      </Tabs.Item>
      <Tabs.Item
        label={
          <div>
            <FiBook />
            Find Book
          </div>
        }
        value="2"
      >
        <FindBooks />
      </Tabs.Item>
    </Tabs>
  );
}
