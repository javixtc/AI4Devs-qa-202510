
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Offcanvas, Button } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import StageColumn from './StageColumn';
import CandidateDetails from './CandidateDetails';
import { useNavigate } from 'react-router-dom';

const PositionDetails = () => {
    const { id } = useParams();
    const [stages, setStages] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [positionName, setPositionName] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterviewFlow = async () => {
            try {
                const response = await fetch(`http://localhost:3010/positions/${id}/interviewFlow`);
                const data = await response.json();
                const interviewSteps = data.interviewFlow.interviewFlow.interviewSteps.map(step => ({
                    title: step.name,
                    id: step.id
                }));
                setStages(interviewSteps);
                setPositionName(data.interviewFlow.positionName);
            } catch (error) {
                console.error('Error fetching interview flow:', error);
            }
        };

        const fetchCandidates = async () => {
            try {
                const response = await fetch(`http://localhost:3010/positions/${id}/candidates`);
                const candidates = await response.json();
                setCandidates(
                    candidates.map(candidate => ({
                        id: candidate.candidateId.toString(),
                        name: candidate.fullName,
                        rating: candidate.averageScore,
                        applicationId: candidate.applicationId,
                        currentInterviewStep: candidate.currentInterviewStep
                    }))
                );
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchInterviewFlow();
        fetchCandidates();
    }, [id]);

    const updateCandidateStep = async (candidateId, applicationId, newStep) => {
        try {
            const response = await fetch(`http://localhost:3010/candidates/${candidateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    applicationId: Number(applicationId),
                    currentInterviewStep: newStep
                })
            });

            if (!response.ok) {
                throw new Error('Error updating candidate step');
            }
        } catch (error) {
            console.error('Error updating candidate step:', error);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const sourceStage = stages[source.droppableId];
        const destStage = stages[destination.droppableId];
        const sourceCandidates = candidates.filter(c => c.currentInterviewStep === sourceStage.title);
        const movedCandidate = { ...sourceCandidates[source.index] };
        const destStageName = destStage.title;
        // Find index in candidates array
        const candidateIndex = candidates.findIndex(c => c.id === movedCandidate.id);
        // Update phase
        const updatedCandidate = { ...movedCandidate, currentInterviewStep: destStageName };
        // Remove from old position
        let updatedCandidates = [...candidates];
        updatedCandidates.splice(candidateIndex, 1);
        // Find destination index in flat array
        const destCandidates = candidates.filter(c => c.currentInterviewStep === destStageName);
        let destFlatIndex = 0;
        if (destCandidates.length > 0) {
            // Find the index of the candidate at destination.index in the flat array
            const destCandidateId = destCandidates[destination.index]?.id;
            destFlatIndex = updatedCandidates.findIndex(c => c.id === destCandidateId);
            if (destFlatIndex === -1) destFlatIndex = updatedCandidates.length;
        } else {
            destFlatIndex = updatedCandidates.length;
        }
        // Insert at destination
        updatedCandidates.splice(destFlatIndex, 0, updatedCandidate);
        setCandidates(updatedCandidates);
        updateCandidateStep(updatedCandidate.id, updatedCandidate.applicationId, destStageName);
    };

    const handleCardClick = (candidate) => {
        setSelectedCandidate(candidate);
    };

    const closeSlide = () => {
        setSelectedCandidate(null);
    };

    return (
        <Container className="mt-5">
            <Button variant="link" onClick={() => navigate('/positions')} className="mb-3">
                Volver a Posiciones
            </Button>
            <h2 className="text-center mb-4" data-testid="position-title">{positionName}</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Row>
                    {stages.map((stage, index) => (
                        <StageColumn
                            key={index}
                            stage={{
                                ...stage,
                                candidates: candidates.filter(c => c.currentInterviewStep === stage.title)
                            }}
                            index={index}
                            onCardClick={handleCardClick}
                            data-testid={`column-${stage.title}`}
                        />
                    ))}
                </Row>
            </DragDropContext>
            <CandidateDetails candidate={selectedCandidate} onClose={closeSlide} />
        </Container>
    );
};

export default PositionDetails;

