import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const getName = async (
  userContent: string,
  assistantContent: string
): Promise<string> => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: userContent },
      { role: 'assistant', content: assistantContent },
    ],
  });
  console.log('message', completion?.choices[0]?.message?.content);

  return completion?.choices[0]?.message?.content;
};

export { getName };
