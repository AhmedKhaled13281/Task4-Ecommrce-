// import { getSession } from "next-auth/react";

// export default async function cartHandler(req , res) {
//     const session = await getSession({ req });
//     console.log(session)

//         if(req.method === "POST"){
//             const {action , product} = req.body
    
//             if(action === "add"){
//                 // if(session){
//                     const cartItems = session?.cartItems || [];
//                     const updatedCartItems = [...cartItems, product];
//                     cartItems.push(product)
//                     // await session?.update({
//                     //     cartItems: cartItems.push(product),
//                     // });
//                     await session?.save();
//                     res.status(200).json({ success: true, cartItems : updatedCartItems });
//                 // }
//                 console.log("cwd")
//             }else if (action === "remove"){
//                 const cartItems = []
//                 const updatedCart = cartItems.filter(item => item?.id !== product?.id)
//                 session.cartItems = updatedCart
//                 await session?.save()
//                 res.status(200).json({ success: true, cartItems: updatedCart });
//             }
    
//         }else {
//             res.status(401).json({message : "Error in Cart Handler"})
//         }
// }

import { getServerSession } from "next-auth";
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function cartHandler(req, res) {
  const session = await getServerSession(req , res , authOptions);
    console.log(session)

  if (req.method === "POST") {
    const { action, product } = req.body;

    if (action === "add") {
      if (session) {
        const cartItems = session.cartItems || [];
        const updatedCartItems = [...cartItems, product];
        session.cartItems = updatedCartItems;
        await session.save();
        res.status(200).json({ success: true, cartItems: updatedCartItems });
      } else {
        res.status(401).json({ message: "User is not authenticated" });
      }
    } else if (action === "remove") {
      if (session) {
        const cartItems = session.cartItems || [];
        const updatedCartItems = cartItems.filter(
          (item) => item?.id !== product?.id
        );
        session.cartItems = updatedCartItems;
        await session.save();
        res.status(200).json({ success: true, cartItems: updatedCartItems });
      } else {
        res.status(401).json({ message: "User is not authenticated" });
      }
    }
  } else {
    res.status(401).json({ message: "Error in Cart Handler" });
  }

}
