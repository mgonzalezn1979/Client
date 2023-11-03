import { ItemPedido } from "./ItemPedido";
//import { Producto} from "./Producto";

export class Pedido{

  constructor(){
        this.total=0;
        this.cantidadProductos=0;
        this.items=[];
        this.ID=-1;
        this.fecha=new Date();
    }

    static convert(obj)
    {
        let ped = new Pedido();
        ped.total=obj.total;
        ped.cantidadProductos=obj.cantidadProductos;
        ped.items=[];
        if(obj.items!=null)
        {
            for(let i=0;i<obj.items.length;i++)
            {
                let item = new ItemPedido();
                item.ID = obj.items[i].ID;
                item.nombre = obj.items[i].nombre;
                item.precio = obj.items[i].precio;
                item.total = obj.items[i].total;
                item.cantidad = obj.items[i].cantidad;
                item.urlFoto=obj.items[i].urlFoto;
                ped.items.push(item);
            }
        }
        return ped;
    }

 
    

}