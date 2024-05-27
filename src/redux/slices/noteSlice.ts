import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from "services/api/apiHelper";
import { noteRequest } from "services";

interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
}

interface NoteState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchNotes = createAsyncThunk(
  "note/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest({ url: noteRequest.NOTES });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch notes"
      );
    }
  }
);

export const addNote = createAsyncThunk(
  "note/addNote",
  async (note: Omit<Note, "id">, { dispatch, rejectWithValue }) => {
    try {
      const response = await postRequest({
        url: noteRequest.NOTES,
        data: note,
      });
      dispatch(noteAdded(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to add note"
      );
    }
  }
);

export const updateNote = createAsyncThunk(
  "note/updateNote",
  async (note: Note, { dispatch, rejectWithValue }) => {
    try {
      const { id, ...toUpdate } = note;
      await putRequest({ url: `${noteRequest.NOTES}/${id}`, data: toUpdate });
      dispatch(noteUpdated(note));
      return note;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to update note"
      );
    }
  }
);

export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async (noteId: string, { dispatch, rejectWithValue }) => {
    try {
      await deleteRequest({ url: `${noteRequest.NOTES}/${noteId}` });
      dispatch(noteDeleted(noteId));
      return noteId;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to delete note"
      );
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    noteAdded: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    noteUpdated: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    noteDeleted: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
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
      .addCase(addNote.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { noteAdded, noteUpdated, noteDeleted } = noteSlice.actions;

export default noteSlice.reducer;
