import Bard from "bard-ai";

async function bard(ask) {
  let myBard = new Bard({
      "__Secure-1PSID":"cAjw9vGZAommtK341LcbLXWKkUKh75NJlLYXMelVbZWXuAhOsMXFnIIph4Bl1jC7i4Kxgg.",
      "__Secure-1PSIDTS":"sidts-CjIBPu3jIXu99uEPqDpfMYLIRW3_IvEzdistiCy6oj5Ua_1y27IhBPHxoaYfTwf7PnfQPxAA"
  });
  
  if(!ask) return { status: false, msg: "bard is need a question" };
  try {
    const response = await myBard.ask(ask);
    return { status: true, data: { question: ask, answer: response }};
  } catch (error) {
    return { status: false, error: error };
    console.log("Error at bard.mjs lib:", error);
  }
}

export default bard;