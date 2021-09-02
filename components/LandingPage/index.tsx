import { Image, Text } from "@geist-ui/react";
import React, { ReactElement } from "react";

export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps): ReactElement | null {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Image
          style={{ marginRight: "3em" }}
          src="https://media-public.canva.com/_gKlQ/MADzx9_gKlQ/1/t.png"
        />
        <Image
          style={{ marginRight: "3em", objectFit: "scale-down" }}
          src="https://media-public.canva.com/zMZVE/MADzx_zMZVE/2/t.png"
          width={200}
          height={200}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Text h1>share the joy of reading</Text>
        <Text h4>
          Have old books that are storing up on your shelf?
          <br />
          List them and let other read your favourite book!
        </Text>
      </div>
        <div>
          <Text h1>find books to borrow</Text>
          <Text h4>
            Looking for a book?
            <br />
            Browse through other people&apos;s libraries and ask!
          </Text>
        </div>
      </div>
    </div>
  );
}
