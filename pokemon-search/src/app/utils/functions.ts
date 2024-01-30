export function formatPokemonId(id: number): string {
    const idString = String(id);
    const paddedId = idString.padStart(4, '0');
    return paddedId;
}

export function formatName(name: string): string {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
}