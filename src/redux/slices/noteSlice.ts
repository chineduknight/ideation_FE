import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk<Note[], string>(
  "notes/fetchNotes",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await new Promise<Note[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: "1",
                userId,
                title: "Sample Note",
                content: "<p>This is a sample note</p>",
              },
            ]),
          500
        )
      );
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch notes");
    }
  }
);

export const addNote = createAsyncThunk<Note, Note>(
  "notes/addNote",
  async (note, { rejectWithValue }) => {
    try {
      const response = await new Promise<Note>((resolve) =>
        setTimeout(
          () => resolve({ ...note, id: new Date().toISOString() }),
          500
        )
      );
      return response;
    } catch (error) {
      return rejectWithValue("Failed to add note");
    }
  }
);

export const deleteNote = createAsyncThunk<
  string,
  { userId: string; noteId: string }
>("notes/deleteNote", async ({ userId, noteId }, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return noteId;
  } catch (error) {
    return rejectWithValue("Failed to delete note");
  }
});

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.notes = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.notes.push(action.payload);
        state.loading = false;
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectNotesLoading = (state: RootState) => state.notes.loading;
export const selectNotesError = (state: RootState) => state.notes.error;

export default noteSlice.reducer;
