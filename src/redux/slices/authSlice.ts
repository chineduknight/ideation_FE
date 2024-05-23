import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setItem, getItem, removeItem } from "utils/storage";

interface User {
  username: string;
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const loadCurrentUser = createAsyncThunk<User | null>(
  "auth/loadCurrentUser",
  async () => {
    const user = (await getItem("currentUser")) as User | null;
    return user;
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await removeItem("currentUser");
});

export const loginUser = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ username, password }, thunkAPI) => {
  const users = ((await getItem("users")) as User[]) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    await setItem("currentUser", user);
    return user;
  } else {
    return thunkAPI.rejectWithValue("Invalid username or password");
  }
});

export const registerUser = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("auth/registerUser", async (userData, thunkAPI) => {
  const users = ((await getItem("users")) as User[]) || [];
  const userExists = users.some((user) => user.username === userData.username);
  if (userExists) {
    return thunkAPI.rejectWithValue("Username already exists");
  } else {
    users.push(userData);
    await setItem("users", users);
    await setItem("currentUser", userData);
    return userData;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadCurrentUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.isAuthenticated = !!action.payload;
          state.user = action.payload;
        }
      )
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? "Login failed";
        }
      )
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? "Registration failed";
        }
      )
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
