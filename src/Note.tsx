import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { Col, Row, Stack, Badge, Button } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "./NoteList.module.css";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack
              gap={2}
              className="align-items-center justify-content-center h-100"
            >
              {note.tags.length > 0 && (
                <Stack gap={1} direction="horizontal" className=" flex-wrap">
                  {note.tags.map((tag) => (
                    <Badge className="text-truncate" key={tag.id}>
                      {tag.label}
                    </Badge>
                  ))}
                </Stack>
              )}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>

            <Button
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div className={styles.markdownContainer}>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
    </>
  );
}
