import { test, expect, Page } from '@playwright/test';

// Selectores estables para columnas y tarjetas
const getColumn = (phase: string) => `[data-testid="column-${phase}"]`;
const getCandidateCard = (candidateId: string) => `[data-testid="candidate-card-${candidateId}"]`;
const getPositionTitle = () => `[data-testid="position-title"]`;

// Helper para drag & drop
async function dragAndDrop(page: Page, candidateId: string, targetPhase: string) {
  const source = await page.locator(getCandidateCard(candidateId));
  const target = await page.locator(getColumn(targetPhase));
  await source.dragTo(target);
}

test.describe('Position Details E2E', () => {
  // Mock de datos iniciales
  const mockPosition = {
    id: '123',
    title: 'Frontend Developer',
    phases: ['Applied', 'Interview', 'Offer', 'Hired'],
    candidates: [
      { id: 'c1', name: 'Alice', phase: 'Applied' },
      { id: 'c2', name: 'Bob', phase: 'Interview' }
    ]
  };

  test.beforeEach(async ({ page }) => {
    // Mock endpoints de datos
    await page.route('**/positions/123/interviewFlow', route =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          interviewFlow: {
            positionName: mockPosition.title,
            interviewFlow: {
              interviewSteps: mockPosition.phases.map((name, idx) => ({
                id: idx + 1,
                name,
                orderIndex: idx
              }))
            }
          }
        })
      })
    );
    await page.route('**/positions/123/candidates', route =>
      route.fulfill({
        status: 200,
        body: JSON.stringify(
          mockPosition.candidates.map((c, idx) => ({
            candidateId: c.id,
            fullName: c.name,
            currentInterviewStep: c.phase,
            averageScore: 4,
            applicationId: idx + 1
          }))
        )
      })
    );
    await page.goto('/positions/123');
  });

  test('Carga de la página de Position', async ({ page }) => {
    // Verifica título
    await expect(page.locator(getPositionTitle())).toHaveText(mockPosition.title);
    // Verifica columnas
    for (const phase of mockPosition.phases) {
      await expect(page.locator(getColumn(phase))).toBeVisible();
    }
    // Verifica tarjetas en columna correcta
    for (const candidate of mockPosition.candidates) {
      const card = page.locator(getCandidateCard(candidate.id));
      await expect(card).toBeVisible();
      await expect(card.locator('..')).toHaveAttribute('data-testid', `column-${candidate.phase}`);
    }
  });

  test('Cambio de fase de un candidato', async ({ page }) => {
    // Intercepta PUT /candidate/:id
    let putCalled = false;
    let putPayload: any = null;
    await page.route('**/candidate/c1', async (route, request) => {
      putCalled = true;
      putPayload = await request.postDataJSON();
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });
    // Drag & drop de Alice de 'Applied' a 'Interview'
    await dragAndDrop(page, 'c1', 'Interview');
    // Verifica que la tarjeta aparece en la nueva columna
    await expect(page.locator(getColumn('Interview')).locator(getCandidateCard('c1'))).toBeVisible();
    // Verifica que el endpoint PUT fue llamado
    expect(putCalled).toBeTruthy();
    // Verifica que el payload contiene la nueva fase
    expect(putPayload).toMatchObject({ currentInterviewStep: 'Interview' });
    // Verifica que la UI se mantiene consistente
    await expect(page.locator(getColumn('Interview')).locator(getCandidateCard('c1'))).toBeVisible();
    await expect(page.locator(getColumn('Applied')).locator(getCandidateCard('c1'))).toHaveCount(0);
  });
});
