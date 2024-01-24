document.addEventListener('DOMContentLoaded', function () {

    const Autos = [
        { id: 1, marca: "AUDI", modelo: "RS6 Class Avant", año: 2018, km: "36.400 Km", precio: 74000, image: 'imagenes/audirs6avant.jpg.jpg'},
        { id: 2, marca: "CHEVROLET", modelo: "Corvette Z06", año: 2015, km: "51.260 Km", precio: 46000, image: 'imagenes/corvettezo6.jpg.jpg'},
        { id: 3, marca: "FORD", modelo: "Mustang Shelby", año: 2020, km: "13.100 Km", precio: 58000, image: 'imagenes/mustangshelby.jpg.webp'},
        { id: 4, marca: "BMW", modelo: "M4", año: 2017, km: "28.400 Km", precio: 39800, image: 'imagenes/bmwm4.webp'},
        { id: 5, marca: "TOYOTA", modelo: "GR Yaris", año: 2022, km: "40.000 Km", precio: 62000, image: "imagenes/gryaris.jpg"},
        { id: 6, marca: "DODGE", modelo: "VIPER", año: 2017, km: "21.000 Km", precio: 114000, image: "imagenes/lastviper.jpg"},
        { id: 7, marca: "FORD", modelo: "Raptor", año: 2021, km: "35.000 Km", precio: 71000, image: "imagenes/raptor.jpg"},
        { id: 8, marca: "DODGE", modelo: "VIPER", año: 2005, km: "32.000 Km", precio: 41000, image: "imagenes/viper2.jpeg"},
        { id: 9, marca: "DODGE", modelo: "Challenger", año: 2020, km: "8.400 Km", precio: 85000, image: "imagenes/challenger.jpg"},
        { id: 10, marca: "TOYOTA", modelo: "Tundra", año: 2023, km: "2.300", precio: 85000, image: "imagenes/tundra.webp"},
    ];

    function rendlistaproductos() {
        const listadeautos = document.getElementById("lista");

        Autos.forEach(Auto => {
            const listaobjetos = document.createElement("div");
            listaobjetos.className = "product";
            listaobjetos.innerHTML = `
                <img src="${Auto.image}" alt="${Auto.marca}">
                <div class="Detalle-Productos">
                    <h2>${Auto.marca}</h2>
                    <h4>${Auto.modelo}</h4>
                    <h4>${Auto.año} | ${Auto.km}</h4>
                    <h3>$${Auto.precio.toFixed(2)}</h3>
                </div>
            `;
            listaobjetos.addEventListener('click', () => addToCart(Auto.id));
            listadeautos.appendChild(listaobjetos);
        });
    }

    window.addToCart = function(productoID) {
        const producto = Autos.find(auto => auto.id === productoID);
      
        if (producto) {
            const autoscontenedor = document.getElementById('item-carrito');
            const autositem = document.createElement('li');
            autositem.textContent = `${producto.marca} - $${producto.precio.toFixed(2)}`;
            autoscontenedor.appendChild(autositem);
          
            updateTotal();
        }
    }

    window.vaciarCarrito = function() {
        const autoscontenedor = document.getElementById('item-carrito');
        autoscontenedor.innerHTML = '';
        updateTotal();
    }

    window.recargarCompra = function() {
        const historialCompra = JSON.parse(localStorage.getItem('historialCompra')) || [];
        historialCompra.forEach(productoID => addToCart(productoID));
    }

    function updateTotal() {
        const actualizarItems = document.querySelectorAll('#item-carrito li');
        let total = 0;
      
        actualizarItems.forEach(actualizarItem => {
            const precio = parseFloat(actualizarItem.textContent.split('$')[1]);
            total += precio;
        });
      
        const compraTotal = document.getElementById('total');
        compraTotal.textContent = `Total: $${total.toFixed(2)}`;

        const historialCompra = Array.from(actualizarItems).map(item => {
            const productoID = Autos.find(auto => auto.marca === item.textContent.split(' - ')[0]).id;
            return productoID;
        });
        localStorage.setItem('historialCompra', JSON.stringify(historialCompra));
    }

    rendlistaproductos();
});