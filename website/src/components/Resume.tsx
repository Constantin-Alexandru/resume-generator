import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Link,
} from "@react-pdf/renderer";
import { Data } from "../interfaces/Data";
import { Entry } from "../interfaces/Entry";

interface Props {
  data: Data;
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Times-Roman",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    margin: 5,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    width: "50%",
    color: "grey",
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  textContainer: {
    fontSize: 12,
    textAlign: "justify",
  },
  separator: {
    borderBottom: "1px solid black",
    marginTop: 5,
    marginBottom: 10,
  },
  bold: {
    fontFamily: "Times-Bold",
  },
});

export default function Resume(props: Props) {
  const { data } = props;
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View>
          <Text style={[styles.title, styles.bold]} fixed>
            {data.personal.name}
          </Text>
          <Text style={{ ...styles.subtitle, width: "100%" }}>
            {data.personal.contacts
              .map((contact) => contact.value.value)
              .join(" · ")}
          </Text>
        </View>
        {data.skills.length > 0 && (
          <View>
            <View style={styles.separator} />
            <Text style={[styles.sectionTitle, styles.bold]}>Skills</Text>
            {Object.entries(
              data.skills.reduce((groups, skill) => {
                groups[skill.type] = groups[skill.type] || [];
                groups[skill.type].push(skill.name);
                return groups;
              }, {} as Record<string, string[]>)
            ).map(([type, skills]) => (
              <View style={{ ...styles.list, ...styles.textContainer }}>
                <Text style={{ color: "grey", fontSize: 12 }}>{type}:</Text>
                <Text style={{ fontSize: 12 }}>{skills.join(", ")}</Text>
              </View>
            ))}
          </View>
        )}
        {Object.entries(
          data.entries.reduce((sections, entry) => {
            sections[entry.section] = sections[entry.section] || [];
            sections[entry.section].push(entry);
            return sections;
          }, {} as Record<string, Entry[]>)
        ).map(([section, entries]) => (
          <View>
            <View style={styles.separator} />
            <Text style={[styles.sectionTitle, styles.bold]}>{section}</Text>
            {entries.map((entry) => (
              <View style={styles.textContainer}>
                <Text style={{ color: "grey", fontSize: 10 }}>
                  {entry.startDate.toLocaleString("default", { month: "long" })}{" "}
                  {entry.startDate.getFullYear()} -{" "}
                  {entry.endDate !== undefined
                    ? `${entry.endDate.toLocaleString("default", {
                        month: "long",
                      })} ${entry.endDate.getFullYear()}`
                    : "ONGOING"}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {entry.name},{" "}
                  <Text style={{ color: "grey", fontSize: 12 }}>
                    {entry.employer}
                  </Text>
                </Text>
                <Text style={{ fontSize: 12 }}>{entry.description}</Text>
                <Text style={{ fontSize: 12 }}>
                  <Text style={styles.bold}>Skills:</Text>
                  <Text style={{ color: "#2e2e2e", fontStyle: "italic" }}>
                    {entry.skills.join(", ")}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        ))}
        {data.personal._links.length > 0 && (
          <View>
            <View style={styles.separator} />
            <Text style={[styles.sectionTitle, styles.bold]}>Links</Text>
            <View style={styles.textContainer}>
              {data.personal._links.map((link) => (
                <View style={styles.list}>
                  <Text>{link.value.id}:</Text>
                  <Link src={link.value.value}>{link.value.value}</Link>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
