import { ItemPedido } from "./ItemPedido";
//import { Producto} from "./Producto";

export class Pedido{

    total;
    cantidadProductos;
    items = [];


    constructor(){
        this.total=0;
        this.cantidadProductos=0;
        this.items=[];
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
                // item.cantidadProductos = obj.ItemPedido[i].cantidadProductos;


                ped.items.push(item);
            }
        }
        return ped;
    }

    actualizaResumen()
    {
        let cantidad = 0;
        let total = 0;
    for(let i=0;i<this.items.length;i++)
    {
        cantidad+=this.items[i].cantidad;
        total+=this.items[i].total;
    }   
    this.cantidadProductos = cantidad;
    this.total=total;
    }

    agregarProducto(ID, nombre, precio)
    {
        
        let item = this.get(ID);

        if(item==null)
        {
            item = new ItemPedido();
            item.ID=ID;
            item.nombre=nombre;
            item.total=precio;
            item.precio=precio;
            item.cantidad=1;
            this.items.push(item);//agrega item nuevo
        }
        else{
            item.cantidad++;
            item.total+=precio;
            for(let i=0;i<this.items.length;i++)
            {
                if(this.items[i].ID==item.ID)
                {
                    this.items[i] = item;//actualiza item
                }
            }
        }
        this.actualizaResumen();       
    }

    get = function(ID)
    {
        for(let i=0;i<this.items.length;i++){
            if(this.items[i].ID)
            { 
                return this.items[i];
            }
        }
    return null;
    }
   
    

}