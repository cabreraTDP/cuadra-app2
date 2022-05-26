const data = [
    {
        Titulo: 'CURP',
        Fecha: '07-04-2022',
        Archivo: 'DJSFJDFGd.pdf',
        CURP: 'DSGFD'

    },
    {
        Titulo: 'RFC Constancia',
        Fecha: '02-04-2022',
        Archivo: 'DJSFJDFGd.pdf',
        CURP: 'DSGFD'

    },
    {
        Titulo: 'NNS IMSS',
        Fecha: '27-03-2022',
        Archivo: 'DJSFJDFGd.pdf',
        CURP: 'DSGFD'

    }
]
    const titles = ['Titulo','Fecha','Archivo']


const options = [
    {
        link: 'nuevo',
        title: 'Nuevo Empleado'
    },
    {
        link: '/app/nominas/nuevo',
        title: 'Nueva Nómina'
    }
]

export {data , titles, options}