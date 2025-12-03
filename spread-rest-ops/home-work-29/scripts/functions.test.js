describe('Function ageClassification()', () => {
  it('should be null', () => {
    expect(ageClassification(-1)).toBe(null);
    expect(ageClassification(0)).toBe(null);
    expect(ageClassification(150)).toBe(null);
    expect(ageClassification(122.01)).toBe(null);
  });

  it('should be "Дитинство"', () => {
    expect(ageClassification(1)).toBe('Дитинство');
    expect(ageClassification(24)).toBe('Дитинство');
  });

  it('should be "Молодість"', () => {
    expect(ageClassification(24.01)).toBe('Молодість');
    expect(ageClassification(44)).toBe('Молодість');
  });

  it('should be "Зрілість"', () => {
    expect(ageClassification(44.01)).toBe('Зрілість');
    expect(ageClassification(65)).toBe('Зрілість');
  });

  it('should be "Старість"', () => {
    expect(ageClassification(65.01)).toBe('Старість');
    expect(ageClassification(75)).toBe('Старість');
  });

  it('should be "Довголіття"', () => {
    expect(ageClassification(75.01)).toBe('Довголіття');
    expect(ageClassification(90)).toBe('Довголіття');
  });

  it('should be "Рекорд"', () => {
    expect(ageClassification(90.01)).toBe('Рекорд');
    expect(ageClassification(122)).toBe('Рекорд');
  });
}); 

describe('Function weekFn()', () => {
  it('should be "Понеділок"', () => {
    expect(weekFn(1)).toBe('Понеділок');
  });

  it('should be "Середа"', () => {
    expect(weekFn(3)).toBe('Середа');
  });

  it('should be "Неділя"', () => {
    expect(weekFn(7)).toBe('Неділя');
  });

  it('should be null', () => {
    expect(weekFn(9)).toBe(null);
    expect(weekFn(1.5)).toBe(null);
    expect(weekFn('2')).toBe(null);
  });
});