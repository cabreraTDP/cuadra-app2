
const data = [
    {
        Nombre: 'Zaira de la Torre',
        Faltas: 'No',
        Complementos: '$200.34',
        Rebajes: '$256.00',
    },
    {
        Nombre: 'Mariana Suarez',
        Faltas: 'No',
        Complementos: '$200.34',
        Rebajes: '$256.00',
    },
    {
        Nombre: 'Alberto Rodriguez',
        Faltas: 'No',
        Complementos: '$200.34',
        Rebajes: '$256.00',
    },
    {
        Nombre: '-----',
        Faltas: '-----',
        Complementos: '-----',
        Rebajes: '-----',
    },
    {
        Nombre: '-----',
        Faltas: '-----',
        Complementos: '-----',
        Rebajes: '-----',
    },
    
]

const titles = ['Nombre','Faltas','Complementos','Rebajes']

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