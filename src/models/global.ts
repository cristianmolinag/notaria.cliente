export class Rol {
    id: number;
    nombre: string;
}


export class Permiso {
    id: number;
    titulo: string;
    componente: string;
}

export class GrupoSangre {
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

export class Perfil {
    id: number;
    nombre?: string;
}

export class TipoTramite {
    id: number;
    nombre?: string;
    valor?: string;
}


export class Usuario {
    id: number;
    correo: string;
    nombres: string;
    apellidos: string;
    contrasena: string;
    remember_token: string;
    estado: number;
    perfil_id: number;
    perfil: Perfil;
    rol_id: number;
    firma: Firma;
}

export class Firma {
    id: number;
    firma?: string;
}

export class Tramite {
    id: number;
    tipo_tramite_id: number;
    cliente_id: number;
    estado_tramite_id: number;
    funcionario_id: number;
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
    firma_declarante: string;
    nombres_testigo_uno: string;
    tipo_documento_testigo_uno_id: number;
    documento_testigo_uno: number;
    firma_testigo_uno: string;
    nombres_testigo_dos: string;
    tipo_documento_testigo_dos_id: number;
    documento_testigo_dos: number;
    firma_testigo_dos: string;
    firma_id: number;
    notas_marginales: string;
    created_at: Date;
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
    pais: Pais;
    departamento: Departamento;
    municipio: Municipio;
    corregimiento: Corregimiento;
}
export class Antecedente {
    id: number;
    nombre: string;
}

export class Busqueda {
    tipo_tramite: number;
    filtro: string;
}

export class Pago {
    id: number;
    cod_autorizacion: number;
    cod_transaccion: number;
    valor: number;
    forma_pago_id: number;
}


