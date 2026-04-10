function ListProduct({image,title,price}){
 
    return (
      <div style ={{display:"flex", flexDirection:"row", gap:"20px"}}>
        <img src={image} style={{minWidth:"100px", maxWidth:"200px"}}></img>


        <div>
          <h1> {title}</h1>
          <p>{price}</p>
        </div>


      </div>
    )
 


}
export default ListProduct; 