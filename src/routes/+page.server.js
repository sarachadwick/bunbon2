export function load({ cookies }) {
  const muffins = cookies.get('muffins') || 0; 
  return { muffins };
}