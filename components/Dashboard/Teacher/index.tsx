import { Spacer, Tabs } from "@geist-ui/react";
import { useState } from "react";
import { FiSearch, FiBookmark } from "react-icons/fi";
import type { Book } from "types";
import SavedBooks from "./SavedBooks";
import FindBook from "./FindBook";

export default function TeacherDashboard() {
  const [bookList, setBookList] = useState<Book[]>([]);
  return (
    <Tabs initialValue="1">
      <Tabs.Item
        label={
          <>
            <FiSearch />
            Find Books
          </>
        }
        value="1"
      >
        <Spacer y={1} />
        <FindBook bookList={bookList} setBookList={setBookList} />
      </Tabs.Item>
      <Tabs.Item
        label={
          <>
            <FiBookmark />
            Saved Books
          </>
        }
        value="2"
      >
        <Spacer y={1} />
        <SavedBooks forceUpdate={Math.random} /> {/* So dodgy but it works*/}
      </Tabs.Item>
    </Tabs>
  );
}
