export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
// Interfaces
export interface Infraccion {
  id: number;
  fechaHora: Date;
  nombre: string;
  apellido: string;
  domicilio: string;
  localidad: string;
  codigoPostal: string;
  partido: string;
  provincia: string;
  pais: string;
  licenciaConducir: string;
  clase: string;
  vencimiento: Date;
  tipoDocumento: string;
  documento: string;
  tipoVehiculo: string;
  nroChasis: string;
  nroMotor: string;
  marcaVehiculo: string;
  otraMarca: string;
  modeloVehiculo: string;
  colorVehiculo: string;
  numeroDominio: string;
  hechoInfraccion: string;
  lugarInfraccion: string;
  leyInfringida: string;
  observaciones: string;
  descripcion: string;
  testigos: string;
  pruebaDocumental: string;
  cinometro: string;
  alcoholimetro: string;
  retuvoLicencia: boolean;
  retuvoVehiculo: boolean;
  estado: boolean;
  count: number;
}

export interface Acta {
  id: number;
  domicilio: string;
  naturalezaHechos: string;
  disposicionLegal: string;
  nombreImputado: string;
  apellidoImputado: string;
  domicilioImputado: string;
  dniImputado: string;
  nombreTestigo: string;
  apellidoTestigo: string;
  domicilioTestigo: string;
  dniTestigo: string;
  estado: boolean;
}
