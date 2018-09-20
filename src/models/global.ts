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

export class LugarCelebracion {
    pais: Pais;
    departamento: Departamento;
    municipio: Municipio;
    corregimiento: Corregimiento;
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

export class rolesPorPermiso {
    id: number;
    titulo: string;
    componente: string;
    roles: Rol[];
}

export class RCNacimiento {
    inscrito: Inscrito;
    indicativo_serial: number;
    antecedente: Antecedente;
    num_nacido_vivo: string;
    madre: Madre;
    padre: Padre;
    declarante: Declarante;
    testigo_uno: Testigo;
    testigo_dos: Testigo;
    notas_marginales: string;
    created_at: Date;
}

export class Inscrito {
    nuip: number;
    primer_apellido: string;
    segundo_apellido: string;
    nombres: string;
    fecha_nacimiento: Date;
    genero: Genero;
    grupo_sanguineo: GrupoSanguineo;
    factor_rh: RH;
    lugar_nacimiento: string;
}

export class Antecedente {
    id: number;
    nombre: string;
}

export class Madre {
    id: number;
    nombres: string;
    tipo_documento: TipoDocumento;
    documento: number;
    pais: Pais;
}

export class Padre {
    id?: number;
    nombres?: string;
    tipo_documento?: TipoDocumento;
    documento?: number;
    pais?: Pais;
}

export class Declarante {
    id: number;
    nombres: string;
    tipo_documento: TipoDocumento;
    documento: number;
    firma_declarante: string;
}

export class Testigo {
    id?: number;
    nombres?: string;
    tipo_documento?: TipoDocumento;
    documento?: number;
    firma_testigo?: string;
}

export class RCMatrimonio {
    capitulacion_id: number;
    contrayente_uno_id: number;
    contrayente_uno: Contrayente;
    contrayente_dos_id: number;
    contrayente_dos: Contrayente;
    denunciante_id: number;
    denunciante: Denunciante;
    fecha_celebracion: Date;
    firma: Firma;
    firma_id: number;
    lugar_celebracion: string;
    notas_marginales: string;
    tipo_documento: string;
    tipo_matrimonio: string;
    indicativo_serial: number;
    created_at: Date;
}

export class Contrayente {
    id: number;
    documento: number;
    nombres: string;
    tipo_documento_id: number;
    tipo_documento: TipoDocumento;
}


export class Denunciante {
    id: number;
    documento: number;
    nombres: string;
    tipo_documento_id: number;
    tipo_documento: TipoDocumento;
    firma_denunciante: string;
}


export class Capitulacion {
    id: number;
    lugar_escritura: string;
    num_notaria: number;
    num_escritura: number;
    fecha_escritura: Date;
}
export class Hijo {
    id: number;
    nombres: string;
    documento: number;
    indicativo_serial: number;
    tipo_documento_id: number;
    tipo_documento: TipoDocumento;
}

export class HijoMatrimonio {
    id: number;
    rc_matrimonio_id: number;
    hijo_id: number;
    hijo: Hijo;
}

export class Providencia {
    id: number;
    tipo_providencia: string;
    num_escritura: number;
    num_notaria: number;
    fecha_providencia: Date;
    firma_providencia: string;
}

export class ProvidenciaMatrimonio {
    id: number;
    providencia_id: number;
    rc_matrimonio_id: number;
    providencia: Providencia;
}

export class RCDefuncion {
    indicativo_serial: number;
    inscrito_id: number;
    lugar_defuncion: string;
    fecha_defuncion: Date;
    hora_defuncion: string;
    certificado_defuncion: string;
    juzgado: string;
    fecha_sentencia: Date;
    tipo_certificado: string;
    nombre_funcionario: string;
    denunciante_id: number;
    testigo_uno_id: number;
    testigo_dos_id: number;
    firma_id: number;
    notas_marginales: string;
    created_at: Date;
    denunciante: Denunciante;
    testigo_uno: Testigo;
    testigo_dos: Testigo;
    firma: Firma;
    inscrito_defuncion: InscritoDefuncion;
}

export class InscritoDefuncion {
    id: number;
    nombres: string;
    documento: number;
    tipo_documento_id: number;
    tipo_documento: TipoDocumento;
    genero_id: number;
    genero: Genero;
}
