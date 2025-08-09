export function useRandomId(len: number = 7, typeId: string) {
  const alphabetLowerCase = "abcdefghijklmnopqrstuvwxyz";
  const alphabetUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "0123456789";

  const allCharacter = alphabetLowerCase + alphabetUpperCase + num;
  let result = `${typeId}-`;
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacter.length);
    result += allCharacter[randomIndex];
  }
  return result;
}
