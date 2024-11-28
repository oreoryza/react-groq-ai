import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Groq from "groq-sdk";

const API_KEY = import.meta.env.VITE_API_KEY;

const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getMessage = createAsyncThunk(
  "groq/message",
  async (content, { getState }) => {
    const state = getState();
    const messages = state.groq.messages;

    const previousMessages = messages.map((msg) => ({
      role: "user",
      content: msg.user,
    }));

    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        ...previousMessages,
        {
          role: "user",
          content,
        },
      ],
    });

    return {
      user: content,
      bot: response.choices[0].message.content,
    };
  }
);

export const resetMessages = createAsyncThunk("groq/reset", async () => {
  return [];
});

const initialState = {
  messages: [],
  loading: false,
  error: null,
  isEmpty: true,
};

//slice
const groqSlice = createSlice({
  name: "groq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isEmpty = false;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error(
          "Error sending message to Groq AI:",
          action.error.message
        );
      })
      .addCase(resetMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
        state.error = null;
        state.isEmpty = true;
      });
  },
});

export default groqSlice.reducer;