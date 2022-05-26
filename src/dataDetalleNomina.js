
const data = [
    {
        Nombre: 'Zaira de la Torre',
        Faltas: 'No',
        Complementos: '$47.30',
        Rebajes: '$256.00',
        TotalPagar: '$256.00',
        Banco: 'BBVA Bancomer',
        Clabe: '9403 9403 4583 2783'
    },
    {
        Nombre: 'Mariana Suarez',
        Faltas: 'No',
        Complementos: '$30.34',
        Rebajes: '$278.00',
        TotalPagar: '$256.00',
        Banco: 'Santander',
        Clabe: '8592 6574 4387 9201'
    },
    {
        Nombre: 'Alberto Rodríguez',
        Faltas: 'No',
        Complementos: '$20.34',
        Rebajes: '$0.00',
        TotalPagar: '$264.00',
        Banco: 'CITI Banamex',
        Clabe: '6589 7392 7564 9285'
    },
    {
        Nombre: '-----',
        Faltas: '-----',
        Complementos: '-----',
        Rebajes: '-----',
        TotalPagar: '-----',
        Banco: '-----',
        Clabe: '-----'
    },
    {
        Nombre: '-----',
        Faltas: '-----',
        Complementos: '-----',
        Rebajes: '-----',
        TotalPagar: '-----',
        Banco: '-----',
        Clabe: '-----'
    },
    
]

const titles = ['Nombre','Faltas','Complementos','Rebajes','Total a pagar','Banco','Clabe']

const options = [
    {
        link: '/empleados/nuevo',
        title: 'Nuevo Empleado'
    },
    {
        link: '/nominas/nuevo',
        title: 'Nueva Nómina'
    }
]

export {data , titles, options}