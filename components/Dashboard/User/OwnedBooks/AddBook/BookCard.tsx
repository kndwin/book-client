import { Image, Card, Text } from "@geist-ui/react";

type BookCardProps = {
  title: string;
  authors: string[];
  imageLinks: { smallThumbnail: string };
  index: number;
  focusBook: any;
};

export default function BookCard({
  title,
  authors,
  imageLinks,
  index,
  focusBook,
}: BookCardProps) {
  return (
    <Card
      hoverable
      style={{ cursor: "pointer" }}
      onClick={() => focusBook(index)}
    >
      <Card.Content
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        {imageLinks ? (
          <Image
            alt="Book image"
            src={imageLinks.smallThumbnail}
            height={200}
            width={200}
            style={{ objectFit: "contain", margin: "1em 0 2em 0" }}
          />
        ) : (
          <Text
            b
            style={{
              height: "200px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No image available
          </Text>
        )}
        <Text b style={{ marginTop: "2em" }}>
          {title}
        </Text>
        <Text>{authors != undefined ? authors[0] : "No authors"}</Text>
      </Card.Content>
    </Card>
  );
}
