const useOpenAI = () => {
  const getCompletion = async (prompt: string) => {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const result = await response.json()

      if (!response.ok) {
        return { role: 'assistant', content: result.content};
      }

      ;
      return result;
    } catch (error) {
      return { role: 'assistant', content: 'Something went wrong' };
    }
  };

  return getCompletion;
};

export default useOpenAI;
