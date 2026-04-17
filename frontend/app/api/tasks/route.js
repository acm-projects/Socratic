export async function GET(){
    const res = await fetch("https://jsonplaceholder.typicode.com/todos")
    const tasks = await res.json()
    return Response.json(tasks)


}
