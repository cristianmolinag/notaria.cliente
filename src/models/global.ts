
export class Rol {
    id: number;
    nombre: string;
}

export class TipoDocumento {
    id: number;
    nombre?: string;
}
export class FormaPago {
    id: number;
    nombre?: string;
}

export class Nacionalidad {
    id: number;
    nombre?: string;
}

export class EstadoTramite {
    id: number;
    nombre?: string;
}

export class Genero {
    id: number;
    nombre?: string;
}

export class TipoTramite {
    id: number;
    nombre?: string;
    valor?: string;
}

export class Persona {
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    documento: number;
    tipo_documento_id: number;
    nacionalidad_id: number;
}

export class Usuario {
    correo: string;
    nombres: string;
    apellidos: string;
    contrasena: string;
    remember_token: string;
    estado: number;
}

export class Tramite {
    id: number;
    tipo_tramite_id: number;
    estado_tramite_id: number;
    forma_pago_id: number;
    cliente_id: number;
}

export class Funcionario {
    persona_id: number;
    firma: Blob;
    usuario_id: number;
    persona: Persona;
    usuario: Usuario;
}

export class RCNacimiento {
    id: number
    nuip: string;
    indicativo_serial: string;
    primer_apellido: string;
    segundo_apellido: string;
    nombres: string;
    fecha_nacimiento: Date;
    genero_id: number;
    grupo_sanguineo_id: number;
    factor_rh_id: number;
    lugar_nacimiento: string;
    antecedente_id: number;
    num_nacido_vivo: string;
    nombres_madre: string;
    tipo_documento_madre_id: number;
    documento_madre: number;
    pais_madre_id: number;
    nombres_padre: string;
    tipo_documento_padre_id: number;
    documento_padre: number;
    pais_padre_id: number;
    nombres_declarante: string;
    tipo_documento_declarante_id: number;
    documento_declarante: number;
    firma_declarante: Blob;
    nombres_testigo_uno: string;
    tipo_documento_testigo_uno_id: number;
    documento_testigo_uno: number;
    firma_testigo_uno: Blob;
    nombres_testigo_dos: string;
    tipo_documento_testigo_dos_id: number;
    documento_testigo_dos: number;
    firma_testigo_dos: Blob;
    firma_id: number;
    notas_marginales: string;
}

export class GrupoSanguineo {
    id: number;
    nombre: string;
}

export class RH {
    id: number;
    nombre: string;
}
export class Pais {
    id: number;
    nombre: string;
}
export class Departamento {
    id: number;
    nombre: string;
    pais_id: number;
    pais: Pais;
}

export class Municipio {
    id: number;
    nombre: string;
    departamento_id: number;
    departamento: Departamento;
}

export class Corregimiento {
    id: number;
    nombre: string;
    municipio_id: number;
    municipio: Municipio;
}

export class LugarNacimiento {
    pais: string;
    departamento: string;
    municipio: string;
    corregimiento: string;
}
export class Antecedente {
    id: number;
    nombre: string;
}



