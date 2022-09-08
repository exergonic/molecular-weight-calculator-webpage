const group_regex = /[A-Z][a-z]?[0-9]*/g;
const sym_regex = /[A-Z][a-z]*/;
const count_regex = /[0-9][0-9]*/;
let molecular_mass = 0;
let elements_data_array = [];

const element_mass_map = {
    "H": 1.0079,
    "He": 4.0026,
    "Li": 6.941,
    "Be": 9.0122,
    "B": 10.811,
    "C": 12.0107,
    "N": 14.0067,
    "O": 15.9994,
    "F": 18.9984,
    "Ne": 20.1797,
    "Na": 22.9897,
    "Mg": 24.305,
    "Al": 26.9815,
    "Si": 28.0855,
    "P": 30.9738,
    "S": 32.065,
    "Cl": 35.453,
    "Ar": 39.948,
    "K": 39.0983,
    "Ca": 40.078,
    "Sc": 44.9559,
    "Ti": 47.867,
    "V": 50.9415,
    "Cr": 51.9961,
    "Mn": 54.938,
    "Fe": 55.845,
    "Co": 58.9332,
    "Ni": 58.6934,
    "Cu": 63.546,
    "Zn": 65.39,
    "Ga": 69.723,
    "Ge": 72.64,
    "As": 74.9216,
    "Se": 78.96,
    "Br": 79.904,
    "Kr": 83.8,
    "Rb": 85.4678,
    "Sr": 87.62,
    "Y": 88.9059,
    "Zr": 91.224,
    "Nb": 92.9064,
    "Mo": 95.94,
    "Tc": 98,
    "Ru": 101.07,
    "Rh": 102.9055,
    "Pd": 106.42,
    "Ag": 107.8682,
    "Cd": 112.411,
    "In": 114.818,
    "Sn": 118.71,
    "Sb": 121.76,
    "Te": 127.6,
    "I": 126.9045,
    "Xe": 131.293,
    "Cs": 132.9055,
    "Ba": 137.327,
    "La": 138.9055,
    "Ce": 140.116,
    "Pr": 140.9077,
    "Nd": 144.24,
    "Pm": 145,
    "Sm": 150.36,
    "Eu": 151.964,
    "Gd": 157.25,
    "Tb": 158.9253,
    "Dy": 162.5,
    "Ho": 164.9303,
    "Er": 167.259,
    "Tm": 168.9342,
    "Yb": 173.04,
    "Lu": 174.967,
    "Hf": 178.49,
    "Ta": 180.9479,
    "W": 183.84,
    "Re": 186.207,
    "Os": 190.23,
    "Ir": 192.217,
    "Pt": 195.078,
    "Au": 196.9665,
    "Hg": 200.59,
    "Tl": 204.3833,
    "Pb": 207.2,
    "Bi": 208.9804,
    "Po": 209,
    "At": 210,
    "Rn": 222,
    "Fr": 223,
    "Ra": 226,
    "Ac": 227,
    "Th": 232.0381,
    "Pa": 231.0359,
    "U": 238.0289,
    "Np": 237,
    "Pu": 244,
    "Am": 243,
    "Cm": 247,
    "Bk": 247,
    "Cf": 251,
    "Es": 252,
    "Fm": 257,
    "Md": 258,
    "No": 259,
    "Lr": 262,
    "Rf": 261,
    "Db": 262,
    "Sg": 266,
    "Bh": 264,
    "Hs": 277,
    "Mt": 268
}

// global var for text entered into input DOM element
let molecular_formula;

// construct the html for the details of the calculation
function details_html(element_data_array) {
    let html = "";
    for (entry of element_data_array) {
        let element_symbol = entry[0]
        let element_count = entry[1]
        let element_mass = entry[1] * element_mass_map[entry[0]]
        html += `${element_symbol} x ${element_count} = ${element_mass.toFixed(4)} <br>`;
    }
    return html
};
// 
function parse_formula(formula) {
    let groups = [...formula.matchAll(group_regex)]
    for (let group of groups) {
        let esymcount = group[0];  //element symbol and it's count
        let element_symbol = sym_regex.exec(esymcount); //element symbol
        let element_count = count_regex.exec(esymcount) || 1; // element count

        elements_data_array.push([element_symbol, element_count])
        molecular_mass += element_mass_map[element_symbol] * element_count;
    }
    return molecular_mass;
}

// create listener for keyup events
window.onkeyup = keyup;

// function to run on keyup
function keyup(e) {
    // reset certain variables on every keypress
    molecular_mass = 0;
    details = "";
    elements_data_array = [];

    // the input molecular formula
    molecular_formula = e.target.value;

    // calculate the molecular mass and construct the detail of the calculation
    molecular_mass = parse_formula(molecular_formula);
    
    // elements_data_array is a global variable constructed in function `parse_formula`
    details_txt = details_html(elements_data_array);
    
    // modify the html on index.html to show molecular mass and the 
    // detail of the calculation.
    document.getElementById('output-text').innerHTML = molecular_mass.toFixed(4);
    document.getElementById('details-text').innerHTML = details_txt;
};