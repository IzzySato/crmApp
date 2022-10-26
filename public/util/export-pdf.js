const exportPDF = (data, formatter, fileName) => {
  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'in',
    format: 'letter',
    putOnlyUsedFonts:true
    });
    pdf.setFontSize(10);
    let yCoordinate = 1;
    data.forEach((item) => {
      if(yCoordinate === 10) {
        pdf.addPage();
        yCoordinate = 1;
      }
      pdf.text(formatter(item), 1, yCoordinate++);
    });
    pdf.save(`${fileName}.pdf`);
};

export {
  exportPDF
}