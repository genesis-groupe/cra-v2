package dto;

import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;
import models.JAbsence;
import models.JMission;
import org.bson.types.ObjectId;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import utils.serializer.ObjectIdSerializer;

import javax.annotation.Nullable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @author f.patin
 */
public class AbsenceDTO {

	@JsonSerialize(using = ObjectIdSerializer.class)
	public ObjectId id;
	@JsonSerialize(using = ObjectIdSerializer.class)
	public ObjectId userId;
	@JsonSerialize(using = ObjectIdSerializer.class)
	public ObjectId missionId;
	@JsonSerialize(using = ObjectIdSerializer.class)
	public ObjectId fileId;
	public String missionCode;
	public String missionLabel;
	public Long startDate;
	public Boolean startMorning;
	public Long endDate;
	public Boolean endAfternoon;
	public BigDecimal nbDays;
	public String label;
	public String comment;
	public Long sentDate;

	@SuppressWarnings({"unused"})
	public AbsenceDTO() {
	}

	public AbsenceDTO(final JAbsence absence, final JMission mission) {
		this.id = absence.id;
		this.userId = absence.userId;
		this.missionId = absence.missionId;
		if(mission != null) {
			this.missionCode = mission.code;
			this.missionLabel = mission.label;
		}
		this.fileId = absence.fileId;
		this.startDate = absence.startDate.getMillis();
		this.startMorning = absence.startMorning;
		this.endDate = absence.endDate.getMillis();
		this.endAfternoon = absence.endAfternoon;
		this.nbDays = absence.nbDays;
		this.comment = absence.comment;
		this.label = absence.label();
		this.sentDate = absence.sentDate != null ? absence.sentDate.getMillis() : null;
	}

	private static AbsenceDTO of(JAbsence absence, final JMission missions) {
		return new AbsenceDTO(absence, missions);
	}

	public static List<AbsenceDTO> of(final List<JAbsence> absences) {
		final Map<ObjectId, JMission> missions = JMission.codeAndMissionType(Lists.newArrayList(Collections2.transform(absences, new Function<JAbsence, ObjectId>() {
			@Nullable
			@Override
			public ObjectId apply(@Nullable final JAbsence absence) {
				return absence.missionId;
			}
		})));
		return Lists.newArrayList(Collections2.transform(absences, new Function<JAbsence, AbsenceDTO>() {
			@Nullable
			@Override
			public AbsenceDTO apply(@Nullable final JAbsence absence) {
				return AbsenceDTO.of(absence, missions.get(absence.missionId));
			}
		}));
	}

	public static AbsenceDTO of(JAbsence absence) {
		return of(Lists.newArrayList(absence)).get(0);
	}
}
