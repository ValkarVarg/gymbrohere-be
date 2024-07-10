export const gridToAbsolutePosition = (gridReference, screenWidth, numColumns) => {
    const tileWidth = screenWidth / numColumns;
    

    const row = gridReference.charAt(0);
    const col = parseInt(gridReference.substring(1)) - 1; 
    
    
    const x = col * tileWidth;
    const y = (row.charCodeAt(0) - 65) * tileWidth;
  
    return { x, y };
  };