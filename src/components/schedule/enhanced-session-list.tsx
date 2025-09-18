"use client";

import { LtSession } from "@/types/talk";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";

interface EnhancedSessionListProps {
	sessions: LtSession[];
	selectedSessionId: number | null;
	onSessionSelect: (sessionId: number) => void;
}

export function EnhancedSessionList({
	sessions,
	selectedSessionId,
	onSessionSelect,
}: EnhancedSessionListProps) {
	return (
		<div className="space-y-2">
			<h3 className="text-sm font-medium text-muted-foreground mb-3">
				LTセッション一覧
			</h3>
			<div className="space-y-2">
				{sessions.map((session) => {
					const isSelected = selectedSessionId === session.id;
					const sessionDate = parseISO(session.date);

					return (
						<Button
							key={session.id}
							variant={isSelected ? "outline" : "default"}
							size="sm"
							className={`hover:bg-gray-100	 w-full justify-start h-auto p-3 ${
								isSelected ? " bg-primary text-primary-foreground" : ""
							}`}
							onClick={() => onSessionSelect(session.id)}
						>
							<div className="flex flex-col items-start w-full space-y-1">
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center space-x-2">
										<Badge variant="outline" className="text-xs">
											第{session.sessionNumber}回
										</Badge>
										{session.title && (
											<span className="font-medium text-sm truncate">
												{session.title}
											</span>
										)}
									</div>
								</div>

								<div className="flex flex-col items-start space-y-1 w-full">
									<div className="flex items-center space-x-1 text-xs opacity-80">
										<CalendarDays className="h-3 w-3" />
										<span>{format(sessionDate, "yyyy/MM/dd")}</span>
									</div>
									<div className="flex items-center space-x-1 text-xs opacity-80">
										<Clock className="h-3 w-3" />
										<span>
											{session.startTime} - {session.endTime}
										</span>
									</div>
									<div className="flex items-center space-x-1 text-xs opacity-80">
										<MapPin className="h-3 w-3" />
										<span className="truncate">{session.venue}</span>
									</div>
								</div>
							</div>
						</Button>
					);
				})}
			</div>
		</div>
	);
}
