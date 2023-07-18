export const GET = (req,res) => {
    try {
        return new Response(JSON.stringify({name: "Avinash"}), { status: 200 });
    } catch (error) {
        console.log("Error: ",error);
    }
}