import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  IconButton,
  Input,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  addNote,
  deleteNote,
  fetchNotes,
  updateNote,
} from "../redux/slices/noteSlice";
import useLogout from "hooks/useLogout";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const loading = useSelector((state: RootState) => state.notes.loading);
  const error = useSelector((state: RootState) => state.notes.error);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [originalNoteTitle, setOriginalNoteTitle] = useState("");
  const [originalNoteContent, setOriginalNoteContent] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const logoutUser = useLogout();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (user) {
      dispatch(fetchNotes());
    }
  }, [dispatch, user]);

  const handleAddNote = () => {
    if (noteTitle.trim() && noteContent.trim()) {
      dispatch(
        addNote({
          userId: user?.id || "",
          title: noteTitle,
          content: noteContent,
        })
      );
      resetNoteState();
    }
  };

  const handleDeleteNote = (noteId: string) => {
    MySwal.fire({
      title: "Delete Note!",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNote(noteId));
        if (noteId === selectedNote) {
          resetNoteState();
        }
        MySwal.fire("Deleted!", "Your note has been deleted.", "success");
      }
    });
  };

  const handleNoteClick = useCallback(
    (note: { id: string; title: string; content: string }) => {
      const hasUnsavedChanges =
        noteTitle !== originalNoteTitle || noteContent !== originalNoteContent;
      if (unsavedChanges && hasUnsavedChanges) {
        MySwal.fire({
          title: "Unsaved changes",
          text: "You have unsaved changes. Do you want to discard them?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Discard changes",
        }).then((result) => {
          if (result.isConfirmed) {
            loadNoteForEditing(note);
          }
        });
      } else {
        loadNoteForEditing(note);
      }
    },
    [
      MySwal,
      unsavedChanges,
      noteTitle,
      noteContent,
      originalNoteTitle,
      originalNoteContent,
    ]
  );

  const handleSaveNote = () => {
    if (selectedNote && noteTitle.trim() && noteContent.trim()) {
      dispatch(
        updateNote({
          id: selectedNote,
          title: noteTitle,
          content: noteContent,
          userId: user?.id || "",
        })
      );
      resetNoteState();
    }
  };

  const handleNewNote = () => {
    const hasUnsavedChanges =
      noteTitle !== originalNoteTitle || noteContent !== originalNoteContent;
    if (unsavedChanges && hasUnsavedChanges) {
      MySwal.fire({
        title: "Unsaved changes",
        text: "You have unsaved changes. Do you want to discard them?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Discard changes",
      }).then((result) => {
        if (result.isConfirmed) {
          resetNoteState();
        }
      });
    } else {
      resetNoteState();
    }
  };

  const resetNoteState = () => {
    setSelectedNote(null);
    setNoteTitle("");
    setNoteContent("");
    setOriginalNoteTitle("");
    setOriginalNoteContent("");
    setUnsavedChanges(false);
  };

  const loadNoteForEditing = (note: {
    id: string;
    title: string;
    content: string;
  }) => {
    setSelectedNote(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setOriginalNoteTitle(note.title);
    setOriginalNoteContent(note.content);
    setUnsavedChanges(false);
  };

  return (
    <Flex minH="100vh" bg="gray.100" p={4}>
      <Box w="300px" bg="white" boxShadow="md" rounded="lg" p={4} mr={4}>
        <Heading size="md" mb={4}>
          Your Notes
        </Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          mb={4}
          onClick={handleNewNote}
        >
          New Note
        </Button>
        <List spacing={3}>
          {notes.map((note) => (
            <ListItem
              key={note.id}
              onClick={() => handleNoteClick(note)}
              cursor="pointer"
            >
              <Flex justify="space-between" align="center">
                <Text>{note.title}</Text>
                <IconButton
                  aria-label="delete"
                  size="sm"
                  background="firebrick"
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                />
              </Flex>
              <Divider />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex="1" bg="white" boxShadow="md" rounded="lg" p={6}>
        <VStack spacing={4} align="stretch">
          <Flex justifyContent="space-between">
            <Heading size="lg">Welcome to Knight's App</Heading>
            <Button variant="secondary" colorScheme="teal" onClick={logoutUser}>
              Logout
            </Button>
          </Flex>
          {user && <Text fontSize="lg">Hello, {user.username}!</Text>}

          <Heading size="md" mt={6} mb={4}>
            {selectedNote ? "Edit Note" : "Add a new note"}
          </Heading>
          <Input
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => {
              setNoteTitle(e.target.value);
              setUnsavedChanges(true);
            }}
            mb={4}
          />
          <CKEditor
            editor={ClassicEditor}
            data={noteContent}
            onChange={(event, editor) => {
              const data = editor.getData();
              setNoteContent(data);
              setUnsavedChanges(true);
            }}
          />
          <Button
            mt={4}
            colorScheme="blue"
            onClick={selectedNote ? handleSaveNote : handleAddNote}
            isLoading={loading}
          >
            {selectedNote ? "Save Note" : "Add Note"}
          </Button>
        </VStack>
        {error && <Text color="red">{error}</Text>}
      </Box>
    </Flex>
  );
};

export default Dashboard;
