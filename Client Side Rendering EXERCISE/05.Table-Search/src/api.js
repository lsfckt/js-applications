export async function get() {
    const res = await fetch('http://localhost:3030/jsonstore/advanced/table', { method: 'GET' });
    const data = await res.json();

    return Object.values(data);
}